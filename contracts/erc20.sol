// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface ERC20 {

    function totalSupply() external pure returns (uint); 
    function balanceOf(address tokenOwner) external view returns (uint balance); 
    function allowance(address tokenowner, address spender) external view returns (uint remaining); 
    function transfer(address to, uint tokens) external returns (bool success); 
    function approve(address spender, uint tokens) external returns (bool success); 
    function transferFrom(address from, uint tokens) external returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens); 
    event Approval (address indexed tokenOwner, address indexed spender, uint tokens);

}