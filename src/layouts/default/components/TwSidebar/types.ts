declare type IMenuItem = ISubMenuRaw | IMenuItemRaw | IMenuItemDisabledRaw;

interface IMenuItemRaw extends IBaseMenu {
  path: string;
  children?: never;
}

interface IMenuItemDisabledRaw extends IBaseMenu {
  path?: string;
  children?: never;
  disabled: true;
}

interface ISubMenuRaw extends IBaseMenu {
  path?: never;
  isTab?: never;
  children: IMenuItem[];
}

interface IBaseMenu {
  id: string; // id，全局唯一
  name: string; // 名称
  path?: string; // url（绝对路径）。支持外链
  icon?: string; // 菜单图标。icon路径。根目录为”/src/assets“
  visiable?: boolean; // 是否显示。true-是；false-否；
  isTab?: boolean; // 是否在tab标签页打开。true-是；false-否；默认true
  disabled?: boolean; // 是否禁用。true-是；false-否。默认false
  children?: IMenuItem[];
}

export type { IMenuItem, ISubMenuRaw, IMenuItemRaw };
