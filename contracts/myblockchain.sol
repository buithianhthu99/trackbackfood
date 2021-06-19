pragma solidity >=0.4.21 <0.7.0;

contract myblockchain {
    mapping(uint => Harvest) harvests;
    uint harvestsAmount;

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
        harvestsAmount = 0;
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
    }

    function getHarvest(uint id) public view returns(string memory, uint, address, string memory, string memory) {
        return (harvests[id].name, harvests[id].productsAmount, harvests[id].owner, harvests[id].startTime, harvests[id].endTime);
    }

    function getHarvestsAmount() public returns(uint) {
        return harvestsAmount;
    }

    function getProduct(uint harvestId, uint productId) public view returns(string memory, uint, uint, string memory) {
        return (harvests[harvestId].products[productId].name, harvests[harvestId].products[productId].processesAmount, harvests[harvestId].products[productId].amount, harvests[harvestId].products[productId].state);
    }

    function getProcess(uint harvestId, uint productId, uint processId) public view returns(string memory, string memory, string memory, string memory) {
        return (harvests[harvestId].products[productId].processes[processId].name, harvests[harvestId].products[productId].processes[processId].ingredients, harvests[harvestId].products[productId].processes[processId].startTime, harvests[harvestId].products[productId].processes[processId].endTime);
    }
}