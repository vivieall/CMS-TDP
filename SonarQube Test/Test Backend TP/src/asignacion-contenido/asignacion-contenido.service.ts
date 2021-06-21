/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AsignacionService } from 'src/asignacion/asignacion.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AsignacionContenidoEntity } from './asignacion-contenido.entity';

@Injectable()
export class AsignacionContenidoService{
    constructor(
        @InjectRepository(AsignacionContenidoEntity)
        private asignacionContenidoRepository: Repository<AsignacionContenidoEntity>,
        private asignacionService: AsignacionService
    ){}

    async findAllTipo(){
        return this.asignacionContenidoRepository.find({relations: ["contenido","grupocontenido","asignacion"]})
    }

    async findByIdGrupo(id){
        return this.asignacionContenidoRepository.find({where: { grupocontenido : id},relations: ["contenido","grupocontenido","asignacion"]})
    }    
    async findOne(id){
        return this.asignacionContenidoRepository.findOne(id, {relations: ["contenido","grupocontenido","asignacion"]});
    }
    async add(body){
        body.id = uuidv4();
        return this.asignacionContenidoRepository.insert(body);
    }
    async update(id,body){
        body.id=id;
        return this.asignacionContenidoRepository.update({id:id}, body);
    }
    async delete(id){
        return this.asignacionContenidoRepository.delete({id:id});
    }
    async updateContenidos(idgrupo,idasignacion){
        let all=await this.findByIdGrupo(idgrupo);
        let asignacion = await this.asignacionService.findOne(idasignacion);
        var json={'id':asignacion.id}
        var asignacionjson= JSON.parse(JSON.stringify(json))
        all.forEach(element => {
            element.asignacion=asignacionjson;
            this.update(element.id,element);
        });
        return all;
    }
}