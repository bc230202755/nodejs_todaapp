import { Task } from "../models/task.model.js"

export const newTask = async (req, res, next) => {

    const { title, descripition } = req.body

    await Task.create({
        title,
        descripition,
        user: req.user
    })

    res.json({
        success: true,
        message: "Task is added Successfully",
    })
}

export const getMyTask = async (req, res, next) => {

    const userid = req.user._id;

    const tasks = await Task.find({ user: userid })

    res.status(200).json({
        success: true,
        tasks,
    })
}
// put:
export const updateTask = async (req, res, next) => {

    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({
        success: false,
        message: "There is no Task"
    })
    task.isCompleted = !task.isCompleted
    await task.save();


    res.status(200).json({
        success: true,
        message: "Task is Updated"

    })
}
// delete:
export const deleteTask = async (req, res, next) => {

    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({
        success: false,
        message: "There is no Task"
    })
    await task.deleteOne();


    res.status(200).json({
        success: true,
        message: "Task is deleted"
    })
}