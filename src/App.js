import React from 'react';
import './App.css';

import UserDetail from './components/UserDetail/UserDetail';
import Select from './components/Select/Select';
import Table from './components/Table/Table';
import BtnAddNewUser from './components/BtnAddNewUser/BtnAddNewUser';
import Search from './components/Search/Search';
import NewUser from './components/NewUser/NewUser';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

export default class App extends React.PureComponent {

  state = {
    dataView: 'small',
    data: [],
    loading: false,
    selectedUser: null,
    searchString: '',
    isAddData: false,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { dataView } = this.state;

    this.setState({ loading: true });
    const rows = (dataView === 'small') ? 32 : 1000;
    const url = `http://www.filltext.com/?rows=${rows}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ data }))
    .finally(() => this.setState({ loading: false }))
    .catch((error) => console.log(`Ошибка: ${error}`))
  }

  handleClickRow = (user) => {
    this.setState({ selectedUser: user });
  }

  handleRemoveUserDetail = () => {
    this.setState({ selectedUser: null });
  }

  handleChange = (event) => {
    this.setState({ dataView: event.target.value }, this.getData);
  }

  get data() {
    if (this.state.searchString) {
      return this.filterData();
    } 

    return this.state.data;
  }

  filterData = () => {
    const { data, searchString } = this.state;

    return data.filter(item => {
      return (
        item.id.toString().includes(searchString) ||
        item.firstName.toLowerCase().includes(searchString) ||
        item.lastName.toLowerCase().includes(searchString) ||
        item.email.toLowerCase().includes(searchString) || 
        item.phone.includes(searchString)
      ) 
    });
  }

  handleChangeSearchStr = (string) => {
    this.setState({ 
      searchString: string
    });
  }

  handleAddNewUser = (user) => {
    this.setState({ 
      data: [user, ...this.state.data]
    });
  }

  handleShowAddData = () => {
    this.setState({ isAddData: true });
  }

  handleCloseAddData = () => {
    this.setState({ isAddData: false });
  }

  render() {
    const { data, loading, selectedUser, dataView, searchString, isAddData } = this.state;

    return (
      <ErrorBoundary>
        <div className="container">
        <div className="wrapper">
          <Select onChangeData={ this.handleChange } value={ dataView }/>
          <BtnAddNewUser onShowAddData={ this.handleShowAddData }/>
          <Search value={ searchString } onChangeData={ this.handleChangeSearchStr }/>
        </div>
        { isAddData && <NewUser onCloseAddData={ this.handleCloseAddData } onAddNewUser={ this.handleAddNewUser }/> } 
        <Table 
          data={ this.data } 
          loading={ loading } 
          onClickRow={ this.handleClickRow }
        />
        { selectedUser && <UserDetail data={ selectedUser } onClickRemove={ this.handleRemoveUserDetail }/> }
      </div>
      </ErrorBoundary>
    )
  }
}


