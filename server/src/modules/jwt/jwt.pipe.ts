import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class JwtUserPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        
    }
}