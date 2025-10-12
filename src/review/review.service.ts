import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ReviewResponseDto } from './dto/review-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateReviewDto } from './dto/create-review.dto';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) private reviewRepository: Repository<Review>,
        private readonly orderService: OrderService
    ){}

    async getAll(userId: number): Promise<ReviewResponseDto[]>{
        const reviews = await this.reviewRepository.find({where: {userId: userId}});

        if(!reviews || reviews.length === 0){
            throw new NotFoundException(`Usuario ID ${userId} aún no has hecho reseñas`);
        }
        return reviews.map(review => plainToInstance(ReviewResponseDto, review, {excludeExtraneousValues: true}))
    }

    async createReview(userId: number, newReview: CreateReviewDto): Promise<ReviewResponseDto>{
        await this.orderService.getOrderItemByUserId(userId, newReview.productId);

        const review = this.reviewRepository.create({...newReview, userId});
        const savedReview = this.reviewRepository.save(review);
        return plainToInstance(ReviewResponseDto, savedReview, {excludeExtraneousValues: true})
    }
}
