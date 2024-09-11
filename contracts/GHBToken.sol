// SPDX-License-Identifier: MIT
/// @title GHBToken
/// @author Gabriel H Brioto
/// @notice Implements a token ethereum
/// @dev Implements a token based on ERC20 standart

pragma solidity 0.8.17;
import "./erc20.sol";

contract GHBToken is ERC20 {

    //atributos
    string public constant name = "GHBToken"; 
    string public constant symbol = "GHBT";
    uint256 public constant decimals = 18;
    uint256 public constant totalSupply_= 1000000000000000000000000;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;

    //construtor
    constructor(){

        balances[msg.sender] = totalSupply_ ;

    }

    //método do tipo "get" que retorna o totalSupply do contrato
    function totalSupply() public override pure returns( uint256){
        return totalSupply_;
    }

    //método do tipo "get" que retorna a quantidade de tokens que uma conta possui
    function balanceOf(address tokenOwner) public override view returns (uint256){
        return balances[tokenOwner];
    }

    //realiza uma transferência
    function transfer(address receiver, uint256 numTokens) public override returns (bool){
        
        //condição para que a transferência ocorra
        require(numTokens <= balances[msg.sender], 'ERRO');

        //recalcula a quantidade de tokens do recebedor e do remetente
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;

        //consolida a transferência
        emit Transfer(msg.sender, receiver, numTokens);
        return true;

    }

    //confere a aprovação de uma transação
    function approve(address delegate, uint256 numTokens) public override returns(bool){
        
        require(numTokens <= balances[msg.sender], 'ERRO');

        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;

    }

    function allowance(address owner, address delegate) public override view returns(uint256){
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, uint256 numTokens) public override returns(bool){
        
        //condições para que a transação ocorra
        require(numTokens <= balances[owner], 'ERRO');
        require(numTokens <= allowed[owner][msg.sender], 'ERRO');

        //recalcula a quantidade de tokens do recebedor e do remetente
        balances[owner] = balances[owner] - numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender] + numTokens;
        balances[msg.sender] = balances[msg.sender] + numTokens;

        //consolida a transferência
        emit Transfer(owner, msg.sender, numTokens);
        return true;

    }

}