import "./DashBoard.scss"
import React, { useEffect, useState } from 'react';
import { getOverView } from "../../../services/apiServices";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useTranslation, Trans} from 'react-i18next'

const DashBoard = (props) => {

    const {t, i18n} = useTranslation()

    const [dataOverview, setDataOverview] = useState([])

    const [dataChart, setDataChart] = useState([])

    useEffect(()=>{
        fetchDataOverview();
    }, [])

    const fetchDataOverview = async() => {
        let res = await getOverView();
        if(res && res.EC === 0){
            setDataOverview(res.DT)
            let Qz = 0, Qs = 0, As = 0
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                  name: 'Quizzes',
                  Qz: Qz,
                },
                {
                  name: 'Questions',
                  Qs: Qs,
                },
                {
                  name: 'Answer',
                  As: As,
                },
               
              ];
            setDataChart(data)
        }
        // console.log("check res", res)
    }
   
    return (
        <div className="dashboard-container">
            <div className="title">

            </div>
            <div className="content">
                <div className="c-left">
                    <div className="child">
                        <span className="text-1">{t('DashBoard.users')}</span>
                        <span className="text-2">
                            {
                                dataOverview && dataOverview.users && dataOverview.users.total ?
                                <>{dataOverview.users.total}</> : <>0</>
                            }   
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">{t('DashBoard.quizzes')}</span>
                        <span className="text-2">
                            {
                                dataOverview && dataOverview.others && dataOverview.others.countQuiz ?
                                <>{dataOverview.others.countQuiz}</> : <>0</>
                            }   
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">{t('DashBoard.questions')}</span>
                        <span className="text-2">
                            {
                                dataOverview && dataOverview.others && dataOverview.others.countQuestions ?
                                <>{dataOverview.others.countQuestions}</> : <>0</>
                            }   
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">{t('DashBoard.answers')}</span>
                        <span className="text-2">
                            {
                                dataOverview && dataOverview.others && dataOverview.others.countAnswers ?
                                <>{dataOverview.others.countAnswers}</> : <>0</>
                            }   
                        </span>
                    </div>
                    
                </div>
                <div className="c-right">
                    <ResponsiveContainer width={"95%"} height={"100%"} >
                        <BarChart data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" stackId="a" fill="#8884d8" />
                            <Bar dataKey="Qs" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="As" stackId="a" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;