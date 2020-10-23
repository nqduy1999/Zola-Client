import AccountServices from './accountServices';
import UserServices from './userServices';
import FriendService from './Friend.service';

export const accountService = new AccountServices();
export const userService = new UserServices();
export const friendService = new FriendService();
