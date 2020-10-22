import AccountServices from './accountServices';
import UserServices from './userServices';
import UploadServices from './uploadServices';
import FriendService from './Friend.service';

export const accountService = new AccountServices();
export const userService = new UserServices();
export const uploadService = new UploadServices();
export const friendService = new FriendService();
