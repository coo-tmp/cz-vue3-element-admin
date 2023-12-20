interface IMenuItem {
  id: string; // id，全局唯一
  name: string; // 名称
  path?: string; // url（绝对路径）。支持外链
  icon?: string; // 菜单图标。icon路径。根目录为”/src/assets“
  visiable?: boolean; // 是否显示。true-是；false-否；
  children?: IMenuItem[];
}

export type { IMenuItem };
