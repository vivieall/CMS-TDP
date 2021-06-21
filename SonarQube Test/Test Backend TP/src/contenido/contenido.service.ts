/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContenidoEntity } from './contenido.entity';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk'
@Injectable()
export class ContenidoService {
    S3Service :AWS.S3
    constructor(
        @InjectRepository(ContenidoEntity)
        private contenidosRepository: Repository<ContenidoEntity>,
        private httpService: HttpService
    ) { 
        this.S3Service = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }
    async findAll() {
        return this.contenidosRepository.find({relations:["itemTransaccion"]});
    }
    async findGeneric() {
        return this.contenidosRepository.find({ relations:["itemTransaccion"], where:{ itemTransaccion: null}});
    }
    async findExternal() {
        let res = await  this.findGeneric()
        if(res){
            let newArray = []
            for (let i = 0; i < res.length; i++) {
                newArray.push("https://tp-bucket20202.s3.us-east-2.amazonaws.com/"+res[i].s3Key);
            }
            return {
                PersonaObject:{
                    nombre: ""
                },
                ofertasArray:newArray
            }
        }
        return {}
    }
    async findOne(id) {
        return this.contenidosRepository.findOne(id,{relations:["itemTransaccion"]});

    }
    async add(body :ContenidoEntity) {
        body.id = uuidv4(); 
        console.log('body!',body)
        return this.contenidosRepository.insert(body);
    }
    async update(id, body : ContenidoEntity) {
        delete body.id 
        return  this.contenidosRepository.update({id:id},body)
    }
    async delete(id) {
        const DBResponse = await this.findOne(id)
        if(DBResponse){
            await this.S3Service.deleteObject({ Bucket: 'tp-bucket20202',Key:DBResponse.s3Key}).promise()
            return this.contenidosRepository.delete({id:id})
        }
        else throw new HttpException('Error not found', 404)
        

    }
    async uploadS3(id,buffer, obj = undefined) {
        const filename = uuidv4()+'.jpg'
        const awsResponse = await this.S3Service.putObject({
         Bucket: 'tp-bucket20202',// (Puede ser env)
         Key:filename, Body:Buffer.from(buffer),
         ACL :"public-read",
         ContentType: 'image/jpeg'
        }).promise()
        const url = "https://tp-bucket20202.s3.us-east-2.amazonaws.com/" + filename
        const objToUpdate :any = {
            url_imagen:url, // (Puede ser env)
            s3Key:filename 
        }
        if(obj){
            if(obj.nombre) objToUpdate.nombre = obj.nombre
            if(obj.descripcion) objToUpdate.descripcion  = obj.descripcion
            if(obj.itemTransaccion) objToUpdate.itemTransaccion  = obj.itemTransaccion
        }
        console.log("upadte?",objToUpdate)
        await this.update(id,objToUpdate)

        return {url: url, id: id }

    }
}
