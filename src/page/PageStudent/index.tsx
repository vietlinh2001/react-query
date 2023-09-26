import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useQueryString} from "../../hook/utils";
import {deleteStudent, getStudent, getStudents} from "../../api/studentApi";
import {Link} from "react-router-dom";

type Props = {}
const PageStudent: React.FC<Props> = () => {
    const queryClient = useQueryClient()

    const queryString: { page?: string } = useQueryString()
    const page = Number(queryString.page) || 1

    // catching data
    const studentQuery = useQuery({
        queryKey: ['students', page],
        queryFn: () => getStudents(page, 10)
    })

    const deleteMutationStudent = useMutation({
        mutationFn: (id: number) => deleteStudent(id),
        // load lai use queryClient.invalidateQueries
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['students', page], exact: true})
    })

    const handleDelete = (id: number) => {
        deleteMutationStudent.mutate(id)
    }

    // const fetchStudent = () => {
    //     const id = '6'
    //     queryClient.prefetchQuery(['student', id], {
    //         queryFn: () => getStudent(id),
    //     }).then(()=>{
    //         console.log("aaa")
    //     })
    // }

    return (
        <div>
            <div className='mt-6 flex justify-start'>
                <Link
                    to='/students/add'
                    className=' rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                >
                    Add Student
                </Link>
            </div>
            <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
                    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope='col' className='py-3 px-6'>
                            #
                        </th>
                        <th scope='col' className='py-3 px-6'>
                            Avatar
                        </th>
                        <th scope='col' className='py-3 px-6'>
                            Name
                        </th>
                        <th scope='col' className='py-3 px-6'>
                            Email
                        </th>
                        <th scope='col' className='py-3 px-6'>
                            <span className='sr-only'>Action</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentQuery.data?.data.map((student) => (
                        <tr
                            key={student.id}
                            className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                        >
                            <td className='py-4 px-6'>{student.id}</td>
                            <td className='py-4 px-6'>
                                <img src={student.avatar} alt='student' className='h-5 w-5'/>
                            </td>
                            <th scope='row'
                                className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                                {student.last_name}
                            </th>
                            <td className='py-4 px-6'>{student.email}</td>
                            <td className='py-4 px-6 text-right'>
                                <Link
                                    to={`/students/add/${student.id}`}
                                    className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                                >
                                    Edit
                                </Link>
                                <button
                                    className='font-medium text-red-600 dark:text-red-500'
                                    onClick={() => handleDelete(student.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default PageStudent
