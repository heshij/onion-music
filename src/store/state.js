import {playMode} from '../common/js/config'
import {loadSearch} from "../common/js/cache"

const state = {
  singer: {},
  playing: false,// 播放状态
  fullScreen: false,// 播放器的展开收起
  playlist: [],// 播放列表
  sequenceList: [],// 顺序列表
  mode: playMode.sequence,// 默认顺序播放
  currentIndex: -1,// 播放索引
  disc: {},
  topList: {},
  searchHistory: loadSearch()
}

export default state
