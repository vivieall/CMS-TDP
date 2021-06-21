import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmenitieEntity } from './amenitie.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AmenitieService {
    weatherApiKey : string
    constructor(
        @InjectRepository(AmenitieEntity)
        private amenitieRepository: Repository<AmenitieEntity>,
        private httpService: HttpService
    ) { 
        this.weatherApiKey  = process.env.WEATHER_KEY
    }
    async findAll(climate = undefined) {
        const DBresponse =  await this.amenitieRepository.find({ relations: ["tipoAmenitie"] });
        console.log(climate)
        if(climate){
            for (let i = 0; i < DBresponse.length; i++) {
                const weatherResponse = await this.httpService.get(`http://api.openweathermap.org/data/2.5/weather?q=${DBresponse[i].clima}&units=metric&appid=${this.weatherApiKey}`).toPromise();
                DBresponse[i].climaData = weatherResponse.data
            }
        }
        return DBresponse

    }
    async findOne(id, climate = undefined) {
        const DBresponse =  await this.amenitieRepository.findOne(id,{relations: ["tipoAmenitie"]});
       
        if(climate){
            const weatherResponse = await this.httpService.get(`http://api.openweathermap.org/data/2.5/weather?q=${DBresponse.clima}&units=metric&appid=${this.weatherApiKey}`).toPromise();
            DBresponse.climaData = weatherResponse.data
        }
        return DBresponse
    }
    async findOneByType(tipoAmenitieID) {
        return this.amenitieRepository.find({where:{tipoAmenitie:tipoAmenitieID},relations: ["tipoAmenitie"]});
    }
    async add(body) {
        body.id = uuidv4(); 
        return this.amenitieRepository.insert(body);
    }
    async update(id, body) {
        delete body.id
        return  this.amenitieRepository.update({id:id},body)
    }
    async delete(id) {
        return this.amenitieRepository.delete({id:id})

    }
}
