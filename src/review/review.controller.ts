import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { GetUser } from 'src/common/decorators/get-user/get-user.decorator';
import { Rol, User } from 'src/user/entities/user.entity';
import { BaseApplicationResponse } from 'src/common/dto/base-application-response.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService){}

    @Get()
    @Roles(Rol.CUSTOMER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getAll(@GetUser() user: User): Promise<BaseApplicationResponse<ReviewResponseDto[]>>{
        const reviews = await this.reviewService.getAll(user.id);
        return{
            statusCode: 200, 
            message: 'Reseñas obtenidas correctamente',
            data: reviews
        }
    }

    @Post()
    @Roles(Rol.CUSTOMER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async create(@GetUser() user: User, @Body() newReview: CreateReviewDto): Promise<BaseApplicationResponse<ReviewResponseDto>>{
        const review = await this.reviewService.createReview(user.id, newReview);
        return{
            statusCode: 201,
            message: 'Reseña creada correctamente',
            data: review
        }
    }


}
