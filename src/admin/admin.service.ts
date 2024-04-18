import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  ///////////////////////////////////// Login /////////////////////////
  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { login, password } = loginAdminDto;
    const admin = await this.adminModel.findOne({ login });

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    if (!admin.is_active) {
      throw new BadRequestException('Admin not active');
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);

    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }

    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      admin._id,
      {
        hashed_refresh_token,
      },
      { new: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'admin logged in',
      admin: updateAdmin,
      tokens,
    };

    return response;
  }

  //////////////////////////////////////// RefreshToken ////////////////////////////

  async refreshToken(adminId: string, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (adminId != decodedToken['id']) {
      throw new BadRequestException('Unauthorized');
    }
    const admin = await this.adminModel.findOne({ _id: adminId });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('User or token not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      adminId,
      { hashed_refresh_token },
      { new: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin refreshed in',
      admin: updateAdmin,
      tokens,
    };
    return response;
  }

  // async refreshToken(adminId: string, refreshToken: string, res: Response) {
  //   const decodedToken = await this.jwtService.decode(refreshToken);
  //   if (adminId !== decodedToken['id']) {
  //     throw new BadRequestException('Invalid admin ID');
  //   }

  //   const admin = await this.adminModel.findById(adminId);
  //   if (!admin || !admin.hashed_refresh_token) {
  //     throw new BadRequestException('Admin or token not found');
  //   }

  //   const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_refresh_token);
  //   if (!tokenMatch) {
  //     throw new ForbiddenException('Forbidden');
  //   }

  //   const tokens = await this.getTokens(admin);
  //   const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);

  //   // MongoDB-da yangilash
  //   const updatedAdmin = await this.adminModel.findByIdAndUpdate(
  //     adminId,
  //     { hashed_refresh_token: hashedRefreshToken },
  //     { new: true }
  //   );

  //   if (!updatedAdmin) {
  //     throw new BadRequestException('Failed to update admin');
  //   }

  //   // Cookie-ni yangilash
  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     maxAge: 10 * 24 * 60 * 60 * 1000, // 10 kun
  //     httpOnly: true,
  //   });

  //   return {
  //     message: 'Admin token refreshed successfully',
  //     admin: updatedAdmin,
  //     tokens: tokens,
  //   };
  // }

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newadmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    const tokens = await this.getTokens(newadmin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      newadmin._id,
      { hashed_refresh_token },
      { new: true },
    );

    return updateAdmin;
  }

  findAll() {
    return this.adminModel.find();
  }

  findOne(id: string) {
    return this.adminModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate({ id }, updateAdminDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.adminModel.deleteOne({ _id: id });
  }
}
