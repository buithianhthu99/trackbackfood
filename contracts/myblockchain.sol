pragma solidity >=0.4.21 <0.7.0;

contract myblockchain {
    mapping(uint => Harvest) harvests;
    uint public harvestsAmount = 0;

    struct Harvest  {
        uint harvestId;
        string name;
        mapping(uint => Product) products;
        uint productsAmount;
        address owner;
        string startTime;
        string endTime;
    }

    struct Product {
        uint productId;
        string name;
        mapping(uint => Process) processes;
        uint processesAmount;
        uint amount;
        string state;
    }

    struct Process {
        uint processId;
        string name;
        string ingredients;
        string startTime;
        string endTime;
    }

    constructor() public {
    }

    function addProcess(uint harvestId, uint productId, string memory _name, string memory _ingredients, string memory _startTime, string memory _endTime) public {
        uint id = harvests[harvestId].products[productId].processesAmount;
        Product storage product = harvests[harvestId].products[productId];
        product.processes[id] = Process(id, _name, _ingredients, _startTime, _endTime);
        product.processesAmount++;
    }

    function addProduct(uint harvestId, string memory _name) public {
        uint id = harvests[harvestId].productsAmount;
        Harvest storage harvest = harvests[harvestId];
        harvest.products[id] = Product(id, _name, 0, 0, "unharvested");
        harvest.productsAmount++;
    }

    function updateProduct(uint harvestId, uint productId, string memory _name, uint _amount, string memory _state) public {
        Product storage product = harvests[harvestId].products[productId];
        product.name = _name;
        product.amount = _amount;
        product.state = _state;
    }

    function addHarvest(string memory _name, address _owner, string memory _startTime, string memory _endTime) public {
        uint id = harvestsAmount;
        harvests[id] = Harvest(id, _name, 0, _owner, _startTime, _endTime);
        harvestsAmount++;
        ownerHarvestCount[_owner]++;
    }

    function getHarvest(uint id) public view returns(string memory, uint, address, string memory, string memory) {
        return (harvests[id].name, harvests[id].productsAmount, harvests[id].owner, harvests[id].startTime, harvests[id].endTime);
    }

    function getProduct(uint harvestId, uint productId) public view returns(string memory, uint, uint, string memory) {
        return (harvests[harvestId].products[productId].name, harvests[harvestId].products[productId].processesAmount, harvests[harvestId].products[productId].amount, harvests[harvestId].products[productId].state);
    }

    function getProcess(uint harvestId, uint productId, uint processId) public view returns(string memory, string memory, string memory, string memory) {
        return (harvests[harvestId].products[productId].processes[processId].name, harvests[harvestId].products[productId].processes[processId].ingredients, harvests[harvestId].products[productId].processes[processId].startTime, harvests[harvestId].products[productId].processes[processId].endTime);
    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function getHarvestsAmount() public view returns(uint) {
        return harvestsAmount;
    }

    mapping(address => uint) public ownerHarvestCount;

    function getHarvestIDsByOwner(address _owner) public view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerHarvestCount[_owner]);
        uint counter = 0;
        
        for (uint i = 0; i < harvestsAmount; i++) {
            if (harvests[i].owner == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}