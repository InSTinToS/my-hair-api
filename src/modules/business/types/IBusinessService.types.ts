import { AddLocationsDTO } from '../dto/addLocations.dto'
import { CreateBusinessDTO } from '../dto/createBusiness.dto'
import { DeleteBusinessDTO } from '../dto/deleteBusiness.dto'
import { DeleteLocationsDTO } from '../dto/deleteLocations.dto'
import { ReadBusinessDTO } from '../dto/readBusiness.dto'
import { ReadBusinessesDTO } from '../dto/readBusinesses.dto'
import { UpdateBusinessDTO } from '../dto/updateBusiness.dto'
import { BusinessEntity } from '../entities/business.entity'

export interface IBusinessService {
  readBusiness: (dto: ReadBusinessDTO) => Promise<BusinessEntity>
  deleteBusiness: (dto: DeleteBusinessDTO) => Promise<BusinessEntity>
  updateBusiness: (dto: UpdateBusinessDTO) => Promise<BusinessEntity>
  readBusinesses: (dto?: ReadBusinessesDTO) => Promise<BusinessEntity[]>
  createBusiness: (dataToCreate: CreateBusinessDTO) => Promise<BusinessEntity>
  addLocations: (dto: AddLocationsDTO) => Promise<BusinessEntity>
  deleteLocations: (dto: DeleteLocationsDTO) => Promise<BusinessEntity>
}
