// ================================
// Created by ekasetya.
// Copyright 10/11/16.
// ================================
import React from 'react';

import Item from './item';
import Breadcrumb from './breadcrumb';

export default class Home extends React.Component {
    render() {
        return (
        	<div className="ui container">
	        	<div className="ui top attached block header">
	        		<Breadcrumb title="Home" />
	        	</div>
	        	<div className="ui bottom attached segment">
		            <div className="ui special four stackable doubling cards">
		                <Item id="test1" src="../themes/default/assets/images/tes1.jpg" name="Microsoft HoloLens" price="39.000.000"/>
		                <Item id="test2" src="../themes/default/assets/images/tes2.jpg" name="HTC Vive" price="12.000.000"/>
		                <Item id="test3" src="../themes/default/assets/images/tes3.jpg" name="Oculus Rift" price="9.800.000"/>
		                <Item id="test4" src="../themes/default/assets/images/tes4.png" name="Omni Virtuix" price="58.000.000"/>
		                <Item id="test5" src="../themes/default/assets/images/tes5.jpg" name="Alienware Steam Machine" price="10.000.000"/>
		                <Item id="test6" src="../themes/default/assets/images/tes6.png" name="Asus Steam Machine" price="10.000.000"/>
		            </div>
		        </div>
	        </div>
        )
    }
}