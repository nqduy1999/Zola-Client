import AccountServices from './accountServices';
import UserServices from './userServices';
import FriendService from './Friend.service';
import GroupChatService from './Group.service';
import RoomService from './Room.service';

export const accountService = new AccountServices();
export const userService = new UserServices();
export const friendService = new FriendService();
export const groupChatService = new GroupChatService();
export const roomService = new RoomService();
