import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // Log the response data before transforming
        console.log('Data before transformation: ', data);

        if (Array.isArray(data)) {
          // If the data is an array, return the object format
          console.log("xxx");
          return {
            success: true,
            data,
            message: 'Data fetched successfully',
            error: null,
          };
        }
        console.log("yy")
        // Otherwise return the data directly
        return data;
      }),
    );
  }
}
