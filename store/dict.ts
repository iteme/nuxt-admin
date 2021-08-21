import { defineStore } from 'pinia';
import { allDict } from '@/api/common/dict';

interface DictItem {
  parent?: string;
  code: string;
  nameCn: string;
  nameEn: string;
}

interface DictState {
  userStatus: DictItem[];
}

export const useDictStore = defineStore({
  id: 'dict',
  state: (): DictState => ({
    userStatus: [],
  }),
  getters: {
    getUserStatus(): DictItem[] {
      return this.userStatus;
    },
  },
  actions: {
    async initDict() {
      const res = await allDict();
      if (res?.data.success) {
        const { result } = res.data;
        this.userStatus = result.userStatus;
      }
    },
  },
});
