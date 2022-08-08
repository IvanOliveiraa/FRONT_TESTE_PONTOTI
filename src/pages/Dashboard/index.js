import React, { Component } from 'react';
import {  Link } from 'react-router-dom';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';




export function Dashboard () {

        return (<>
           <Sidebar/>      
            
       <div style={{ flexDirection: "column", margin:'0px',padding:'0px', width :'100%'}}>
                <Topbar />
                <Header title="Dashboard" />
                <div>
                <hr className="my-3" />
                <p>
                    <code> logado com sucesso! ^-^  </code>
                </p>
                <div className="text-center">
                    <Link to="/logout" className="btn btn-outline-primary"> Log Out </Link>
                </div>
                </div>
                </div>
            
            </>
        );
    }
export default Dashboard