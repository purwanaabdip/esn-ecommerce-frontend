// ================================
// Created by ekasetya.
// Copyright 10/18/16.
// ================================
import React from 'react';

import Item from './item';
import Breadcrumb from './breadcrumb';

export default class PS4 extends React.Component {
    render() {
        return (
        	<div className="ui container">
	        	<div className="ui top attached block header">
	        		<Breadcrumb title="PS4" />
	        	</div>
	        	<div className="ui bottom attached segment">
		            <div className="ui special four stackable doubling cards">
		                <Item id="test1" src="../themes/default/assets/images/ps4-1.jpg" name="Injustice: Gods Among Us" price="390.000"/>
		                <Item id="test2" src="../themes/default/assets/images/ps4-2.jpg" name="Destiny" price="420.000"/>
		                <Item id="test3" src="../themes/default/assets/images/ps4-3.jpg" name="The Witcher 3: Wild Hunt" price="580.000"/>
		                <Item id="test4" src="../themes/default/assets/images/ps4-4.jpg" name="The Order 1886" price="285.000"/>
		                <Item id="test5" src="../themes/default/assets/images/ps4-5.jpg" name="Grand Theft Auto V" price="580.000"/>
		                <Item id="test6" src="../themes/default/assets/images/ps4-6.jpg" name="Bloodborne" price="350.000"/>
		            </div>	        		
		        </div>
	        </div>
        )
    }
}