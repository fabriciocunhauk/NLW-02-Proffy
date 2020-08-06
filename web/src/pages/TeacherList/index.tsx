import React, { useState, FormEvent } from 'react';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import PageHeader from '../../components/PageHeader';

import './styles.css';
import api from '../../services/api';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(event: FormEvent) {
        event.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);

    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Available teachers" >
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Subject"
                        value={subject}
                        onChange={event => { setSubject(event.target.value) }}
                        options={[
                            { value: 'Programing', label: 'Programing' },
                            { value: 'Art', label: 'Art' },
                            { value: 'English', label: 'English' },
                            { value: 'Economy', label: 'Economy' },
                            { value: 'Science', label: 'Science' },
                            { value: 'Bussines', label: 'Bussines' },
                            { value: 'Acounting', label: 'Acounting' },
                            { value: 'Math', label: 'Math' },
                        ]}
                    />

                    <Select
                        name="week_day"
                        label="Week day"
                        value={week_day}
                        onChange={event => { setWeek_day(event.target.value) }}
                        options={[
                            { value: '0', label: 'Sunday' },
                            { value: '1', label: 'Monday' },
                            { value: '2', label: 'Tuesday' },
                            { value: '3', label: 'Wednesday' },
                            { value: '4', label: 'Thursday' },
                            { value: '5', label: 'Friday' },
                            { value: '6', label: 'Saturday' },
                        ]}
                    />

                    <Input
                        type="time"
                        name="time"
                        label="Time"
                        value={time}
                        onChange={event => { setTime(event.target.value) }}
                    />

                    <button type="submit">
                        Search
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                    />
                })}
            </main>
        </div>

    )
}

export default TeacherList;