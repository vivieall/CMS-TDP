/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotorFacialEntity } from './motor-facial.entity';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';
@Injectable()
export class MotorFacialService{
    S3Service: AWS.S3
    constructor(
        @InjectRepository(MotorFacialEntity)
        private motorFacialRepository: Repository<MotorFacialEntity>,
    ){
        this.S3Service = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }
    async findAll() {
        return this.motorFacialRepository.find();
    }
    async findOne(id) {
        return this.motorFacialRepository.findOne(id);
    }
    async add(body) {
        body.id = uuidv4();
        return this.motorFacialRepository.insert(body);
    }
    async update(id, body) {
        delete body.id 
        return this.motorFacialRepository.update({id:id}, body);
    }
    async delete(id) {
        const DBResponse = await this.findOne(id)
        if(DBResponse){
            await this.S3Service.deleteObject({Bucket: 'tp-bucket20202-facial', Key:DBResponse.s3Key}).promise()
            return this.motorFacialRepository.delete({id:id});
        }
        else throw new HttpException('Error: not found', 404)
        
    }

    async uploadS3(id, buffer, obj = undefined){
        const filename = uuidv4()+'.jpg'
        const awsResponse = await this.S3Service.putObject({
            Bucket:'tp-bucket20202-facial',// (Puede ser env)
            Key:filename,
            Body:Buffer.from(buffer),
            ACL :"public-read",
            ContentType: 'image/jpeg'
        }).promise()
        const url = "https://tp-bucket20202-facial.s3.us-east-2.amazonaws.com/" + filename
        const objToUpdate :any = {
            url_imagen:url, // (Puede ser env)
            s3Key:filename
        }

        if(obj){
            if(obj.titulo) objToUpdate.titulo = obj.titulo
            if(obj.descripcion) objToUpdate.descripcion = obj.descripcion
            if(obj.itemfacial) objToUpdate.itemfacial = obj.itemfacial
        }
        console.log("update?",objToUpdate)
        await this.update(id,objToUpdate)

        return {url: url, id: id}
    }
}