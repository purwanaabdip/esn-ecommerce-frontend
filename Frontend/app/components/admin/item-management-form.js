// ================================
// Created by Eka Setya Nugraha.
// Copyright 01/02/2017.
// ================================
import React from 'react';

export default class ItemManagementForm extends React.Component {
  componentDidMount() {
    $('.ui.modal').modal('attach events', this.props.button, 'show');
  }
  render() {
    return (
      <div className="ui modal">
        <i className="close icon"></i>
        <div className="header">
          Add new item
        </div>
        <div className="image content">
          <div className="image">
            An image can appear on left or an icon
          </div>
          <div className="description">
            A description can appear on the right
          </div>
        </div>
        <div className="actions">
          <div className="ui black deny button">Cancel</div>
          <div className="ui positive button">Create</div>
        </div>
      </div>
    )
  }
}
