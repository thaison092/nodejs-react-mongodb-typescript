import http from "../common/http-common";
import IUserData from "../model-types/user.type"

class UserDataService {
    
    getAll() {
        return http.get<Array<IUserData>>("/users/all");
    }

    get(id: string) {
        return http.get<IUserData>(`/tutorials/${id}`);
    }

    create(data: IUserData) {
        return http.post<IUserData>("/users/add", data);
    }

    update(data: IUserData, id: any) {
        return http.put<any>(`/tutorials/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/tutorials/${id}`);
    }

    deleteAll() {
        return http.delete<any>(`/tutorials`);
    }

    findByEmail(title: string) {
        return http.get<Array<IUserData>>(`/tutorials?title=${title}`);
    }
}
export default new UserDataService();