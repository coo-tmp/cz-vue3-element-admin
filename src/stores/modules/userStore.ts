import { defineStore } from 'pinia';
import { ref } from 'vue';
import { store } from '../StoreService';

const useStore = defineStore('UserStore', () => {
  // state
  const openId = ref<string>('user_open_id');
  const nickname = ref<string>('user_nickname');
  const avatar = ref<string>('user_avatoar');
  const token = ref({
    access_token: '',
    token_type: '',
    refresh_token: '',
    expires_in: -1,
    openid: -1,
    createTime: -1,
  });

  // actions
  function updateNickname(val: string): void {
    nickname.value = val;
  }

  function isLogin(): boolean {
    if (token.value.access_token.length > 0 && -1 != token.value.createTime) {
      const now = new Date().getTime();
      return now < token.value.createTime + token.value.expires_in * 1000;
    }

    return false;
  }

  function updateToken(val: { access_token: string; token_type: string; refresh_token: string; expires_in: number; openid: number }) {
    token.value.access_token = val.access_token;
    token.value.token_type = val.token_type;
    token.value.refresh_token = val.refresh_token;
    token.value.expires_in = val.expires_in;
    token.value.openid = val.openid;
    token.value.createTime = new Date().getTime();
  }

  return {
    openId,
    nickname,
    avatar,
    updateNickname,
    isLogin,
    updateToken,
  };
});

const userStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { userStoreHook };
