import {_baseQuery} from './request'

export default {
  queryTableData(data){
    return _baseQuery('/queryAll', data);
  },
  addTableData(data){
    return _baseQuery('/add', data);
  },
  delTableData(lid){
    return _baseQuery('/delete', {lid});
  },
  updateTableData(data){
    return _baseQuery('/update', data);
  },
  queryLinkData(url){
    return _baseQuery('/link', {url});
  }
}