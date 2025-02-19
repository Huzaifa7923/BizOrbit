import { Controller, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { AuthGuard } from "src/users/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import * as fs from 'fs'

@Controller('documents')
@UseGuards(AuthGuard)
export class DocumentsController{

    constructor(private readonly documentService:DocumentService){}

    @Post('upload/:docType')
    @UseInterceptors(
        FileInterceptor('file',{
            storage:diskStorage({
                destination:(req:any,file,callback)=>{
                    const userId=req.user.id;
                    const docType=req.params.docType

                    const uploadPath = join(__dirname, '../../uploads', `${userId}`, docType);

                    fs.mkdirSync(uploadPath, { recursive: true });

                    callback(null, uploadPath);
                },
                filename:(req,file,callback)=>{
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                }
            }),
        })
    )
    async uploadFile(
        @UploadedFile() file:Express.Multer.File,
        @Param('docType') docType:string,
        @Req() req
    ){
        console.log("inside controller document ")
        console.log(req.user);
        const userId=req.user.id;
        const fileUrl = `http://localhost:3000/uploads/${req.user.id}/${docType}/${file.filename}`;

        const document=await this.documentService.uploadFile(userId,fileUrl,docType);
        return document;
    }


    // @UseInterceptors(
    //     FileInterceptor('file',{
    //         storage:diskStorage({
    //             destination:()=>{},
    //             filename:()=>{}
    //         }),
    //     })
    // )
    // async uploadFile(){

    // }

}