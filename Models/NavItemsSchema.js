import mongoose from "mongoose";

const NavItemSchema = new mongoose.Schema({
    labelname: {
        type: String,
        required: true
    },
})
mongoose.models = {}//Before defining the NavItem model, you may want to clear existing models using mongoose.models = {} to prevent any potential conflicts.
const NavItem= mongoose.model('NavItem', NavItemSchema);
export default NavItem;