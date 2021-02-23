import React from 'react';
import './Table.css';
import BootstrapTable from 'react-bootstrap/Table';
import Spinner from '../Spinner/Spinner';
import _ from 'lodash';

export default class Table extends React.PureComponent {

  state = {
    sort: { 
      field: '',
      direction: 'asc'
    }
  }

  handleSort = (field) => {
    this.setState({
      sort: {
        field,
        direction: this.state.sort.direction === 'asc' ? 'desc' : 'asc'
      }
    });
  }

  get data() {
    if (this.state.sort.field) {
      return _.orderBy(
        this.props.data,
        [this.state.sort.field],
        [this.state.sort.direction]
      );
    }

    return this.props.data 
  }

  get headings() {
    return [
      { label: 'ID', value: 'id' },
      { label: 'First Name', value: 'firstName' },
      { label: 'Last Name', value: 'lastName' },
      { label: 'E-mail', value: 'email' },
      { label: 'Phone', value: 'phone' }
    ];
  }

  render() {
    const { loading, onClickRow } = this.props;
    const { sort } = this.state;

    return (
      <>
        <BootstrapTable responsive bordered hover className="cursor">
        <thead>
          <tr>
            { this.headings.map((heading, index) => (
              <th 
                key={ index }
                onClick={ () => this.handleSort(heading.value) }
              ><>
                { heading.label }
                { heading.value === sort.field && (
                  sort.direction === 'asc' ? <span> &#8593;</span> : 	<span> &#8595;</span>
                ) }
              </></th>
            )) }
          </tr>
        </thead>
        <tbody>
        {
          !loading && this.data.map((user, index) =>{
            return (
              <tr 
                key={ index }
                onClick={() => onClickRow(user)}
              >
                <td>{ user.id }</td>
                <td>{ user.firstName }</td>
                <td>{ user.lastName }</td>
                <td>
                  <a href="#">
                    { user.email }
                  </a>
                </td>
                <td>
                  <a href={ user.phone }>
                    { user.phone }
                  </a>
                </td>
              </tr>
            )
          })
        }
        </tbody>
        </BootstrapTable>
        { loading && <Spinner/> }
      </>
    )
  }      
}