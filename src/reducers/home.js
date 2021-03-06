// åå§åç¶æ?
const initState = {
  homeInfo: {},
  dataList: [],
  index: 0,
  path: ''
};

export function home(state = initState, action) {
  switch (action.type) {
    case 'RECEIVE_HOME':
      return {
        ...state,
        homeInfo: action.homeInfo
      };
    case 'SET_INDEX':
      return {
        ...state,
        index: action.index
      };
    case 'SET_PATH':
      return {
        ...state,
        path: action.path
      };
    case 'RECEIVE_FETCHDEMO': {
      const arr = [
        {
          companyName: 'åä¸ºææ¯æéå¬å?,
          taxNumber: '914403001922038216',
          address: 'æ·±å³å¸é¾å²åºåç°åä¸ºæ»é¨åå¬æ¥?,
          tell: '0755-28780808',
          bank: 'ä¸­å½å·¥åé¶è¡æ·±å³åä¸ºæ¯è¡',
          num: '4000020309024500386'
        },
        {
          companyName: 'åä¸ºæèµæ§è¡æéå¬å¸',
          taxNumber: '91440300746645251H',
          address: 'æ·±å³å¸é¾å²åºåç°åä¸ºåºå°Bå?å·æ¥¼',
          tell: '0755-28780808',
          bank: 'ä¸­å½å·¥åé¶è¡æ·±å³å¸åè¡?,
          num: '4000020319200123819'
        },
        {
          companyName: 'åäº¬åä¸ºæ°å­ææ¯æéå¬å?,
          taxNumber: '91110108785501795T',
          address: 'åäº¬å¸æµ·æ·åºä¸å°ä¿¡æ¯è·¯3å?,
          tell: '010-82882008',
          bank: 'ä¸­å½é¶è¡åäº¬è¥¿åæ¯è¡',
          num: '324656014944'
        },
        {
          companyName: 'è¥¿å®åä¸ºææ¯æéå¬å?,
          taxNumber: '91610131668683606U',
          address: 'è¥¿å®å¸é«æ°åºé¦ä¸è·?27å?,
          tell: '029-86488050',
          bank: 'ä¸­å½é¶è¡è¥¿å®é«æ°ææ¯å¼ååºæ¯è¡',
          num: '103210172992'
        },
        {
          companyName: 'åä¸ºç»ç«¯æéå¬å¸',
          taxNumber: '914403007556750304',
          address: 'æ·±å³å¸é¾å²åºåç°åä¸ºåºå°Bå?å·æ¥¼',
          tell: '0755-28780808',
          bank: 'ä¸­å½é¶è¡æ·±å³å¸åè¡ä¸ç§åæ¯è¡',
          num: '757557959933'
        },
        {
          companyName: 'æé½åä¸ºææ¯æéå¬å?,
          taxNumber: '915101006630031225',
          address: 'æé½é«æ°è¥¿åºè¥¿æºå¤§é1899å?,
          tell: '028-64690799',
          bank: 'ä¸­å½å·¥åé¶è¡æé½é«æ°ææ¯äº§ä¸å¼ååºæ¯è¡',
          num: '4402239019000076621'
        }
      ];
      return {
        ...state,
        dataList: arr
      };
    }
    default:
      return { ...state };
  }
};
