import {Student, Students} from "../type/student";
import Axios from "../hook/axios";

export const getStudents = (page: number | string, limit: number | string) =>
    Axios.get<Students>('students', {
        params: {
            _page: page,
            _limit: limit
        },
    })
export const getStudent = (id: number | string) => Axios.get(`students/${id}`)
export const addStudent = (student: Pick<Student, 'first_name' | 'last_name' | 'email' | 'gender' | 'country' | 'avatar'>) => Axios.post<Students>('students', student)
export const deleteStudent = (id: number | string) => Axios.delete(`students/${id}`)
