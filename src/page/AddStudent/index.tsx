import React, {useMemo, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Student} from "../../type/student";
import {addStudent} from "../../api/studentApi";
import {isAxiosError} from "../../hook/utils";

type FormStateType = Pick<Student, 'email' | 'last_name' | 'first_name' | 'gender' | 'country' | 'avatar'>
type FormError = { [key in keyof FormStateType]: string | null }
const initialFormState: Pick<Student, 'email' | 'last_name' | 'first_name' | 'gender' | 'country' | 'avatar'> = {
    email: '',
    last_name: '',
    first_name: '',
    gender: '',
    country: '',
    avatar: ''
}
export default function AddStudent() {
    const [formState, setFormState] = useState<FormStateType>(initialFormState)

    // update data
    const mutationAddStudent = useMutation({
        mutationFn: (body: FormStateType) => {
            return addStudent(body)
        },
    })

    // bat err it bi render nhieu lan
    const errorForm = useMemo(() => {
        const error = mutationAddStudent.error
        if (isAxiosError<{ error: FormError }>(error) && error.response?.status === 422)
            return error.response?.data.error
    }, [])

    const handleChange = (name: keyof FormStateType) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({...prev, [name]: event.target.value}))
        if (mutationAddStudent.data || mutationAddStudent.error) {
            mutationAddStudent.reset()
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutationAddStudent.mutate(formState, {
            onSuccess: () => {
                setFormState(initialFormState)
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='mt-6 grid md:grid-cols-3 md:gap-9'>
                    <div className='group relative z-0 mb-6 w-full'>
                        <input
                            type='tel'
                            name='first_name'
                            id='first_name'
                            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                            placeholder=' '
                            required
                            value={formState.first_name}
                            onChange={handleChange('first_name')}
                        />
                        <label
                            htmlFor='first_name'
                            className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                        >
                            First Name
                        </label>
                    </div>
                    <div className='group relative z-0 mb-6 w-full'>
                        <input
                            type='text'
                            name='last_name'
                            id='last_name'
                            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                            placeholder=' '
                            required
                            value={formState.last_name}
                            onChange={handleChange('last_name')}
                        />
                        <label
                            htmlFor='last_name'
                            className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                        >
                            Last Name
                        </label>
                    </div>
                    <div className='group relative z-0 mb-6 w-full'>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                            placeholder=' '
                            required
                            value={formState.email}
                            onChange={handleChange('email')}
                        />
                        <label
                            htmlFor='last_name'
                            className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                        >
                            Email
                        </label>
                        {errorForm && <div>Loi {errorForm.email}</div>}
                    </div>
                    <div className='group relative z-0 mb-6 w-full'>
                        <input
                            type='text'
                            name='gender'
                            id='gender'
                            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                            placeholder=' '
                            required
                            value={formState.gender}
                            onChange={handleChange('gender')}
                        />
                        <label
                            htmlFor='last_name'
                            className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                        >
                            Gender
                        </label>
                    </div>
                    <div className='group relative z-0 mb-6 w-full'>
                        <input
                            type='text'
                            name='country'
                            id='country'
                            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                            placeholder=' '
                            required
                            value={formState.country}
                            onChange={handleChange('country')}
                        />
                        <label
                            htmlFor='last_name'
                            className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                        >
                            Country
                        </label>
                    </div>
                    <div className='group relative z-0 mb-6 w-full'>
                        <input
                            type='text'
                            name='avatar'
                            id='avatar'
                            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                            placeholder=' '
                            required
                            value={formState.avatar}
                            onChange={handleChange('avatar')}
                        />
                        <label
                            htmlFor='last_name'
                            className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
                        >
                            Avatar
                        </label>
                    </div>
                </div>
                <button
                    className=' rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                    type={"submit"}>Add Student
                </button>
            </form>
        </div>
    )
}

