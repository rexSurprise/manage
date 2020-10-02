import {_baseQuery} from './request'

export default {
  queryTableData(){
    return _baseQuery('/queryAll', {});
  },
  addTableData(data){
    return _baseQuery('/add', {}, 'POST', data);
  },
  delTableData(lid){
    return _baseQuery('/del', {}, 'POST', {lid});
  },
  updateTableData(data){
    return _baseQuery('/update', {}, 'POST', data);
  }
}