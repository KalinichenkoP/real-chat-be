import {HttpClient} from './http-client.service';
import {NotifierService} from '../notifier/notifier.service';
import {Injectable} from '@angular/core';
import ClientService from '../../../classes/ClientService';
import {AuthService} from '../google-auth/auth.service';
import {DepartmentAttributes} from '../../../interfaces/DepartmentAttributes';

/**
 * Service that deals with department:
 */
@Injectable()
export class DepartmentService extends ClientService {
    constructor(protected http: HttpClient,
                protected notify: NotifierService,
                private auth: AuthService) {
        super(http, notify);
    }
    public async getAllDepartments(): Promise<DepartmentAttributes[]> {
        return this.simpleGET('/api/departments');
    }
}
