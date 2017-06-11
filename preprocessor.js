/**
 * Created by Xin on 28/05/2017.
 */
const fs = require('fs');
eval(fs.readFileSync('./js/Constants.js')+';global.Constants = Constants;');
eval(fs.readFileSync('./js/EventHub.js')+';global.EventHub = EventHub;');
eval(fs.readFileSync('./js/model/ZobristHash.js')+';global.ZobristHash = ZobristHash;');
eval(fs.readFileSync('./js/model/TranspositionTableEntry.js')+';global.TranspositionTableEntry = TranspositionTableEntry;');
eval(fs.readFileSync('./js/model/TranspositionTable.js')+';global.TranspositionTable = TranspositionTable;');
eval(fs.readFileSync('./js/model/Move.js')+';global.Move = Move;');
eval(fs.readFileSync('./js/model/Point.js')+';global.Point = Point;');
eval(fs.readFileSync('./js/model/Player.js')+';global.Player = Player;');
eval(fs.readFileSync('./js/model/Master.js')+';global.Master = Master;');
eval(fs.readFileSync('./js/model/Board.js')+';global.Board = Board;');
eval(fs.readFileSync('./js/components/GoBoard.js')+';global.GoBoard = GoBoard;');
eval(fs.readFileSync('./js/components/Stone.js')+';global.Stone = Stone;');
eval(fs.readFileSync('./js/components/CircleStone.js')+';global.CircleStone = CircleStone;');
eval(fs.readFileSync('./js/components/CrossStone.js')+';global.CrossStone = CrossStone;');
eval(fs.readFileSync('./js/View.js')+';global.View = View;');
eval(fs.readFileSync('./js/Controller.js')+';global.Controller = Controller;');
eval(fs.readFileSync('./js/App.js')+';global.App = App;');