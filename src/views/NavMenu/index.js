import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import Cookies from 'js-cookie';
import { CalendarOutlined } from '@ant-design/icons';
const SubMenu = Menu.SubMenu;

export default class NavMenu extends React.Component {

    menuItemClicked(message) {
        switch (message.key) {
            case "logout":
                Cookies.remove("token");
                this.props.setlogin(false);
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                onClick={this.menuItemClicked.bind(this)}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" title={<span><Icon type="user" />Applicants</span>}>
                    <Menu.Item key="1" ><Link onClick={this.props.closeDrawer} to="/dashboard">Dashboard</Link></Menu.Item>
                    <Menu.Item key="2"><Link onClick={this.props.closeDrawer} to="/notifications">notifications</Link></Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span> <CalendarOutlined />Dates</span>}>
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>

                </SubMenu>

                <Menu.Item key="logout">
                    <Icon type="logout" />
                    <span>logout</span>
                </Menu.Item>
            </Menu>
        )
    }
}
