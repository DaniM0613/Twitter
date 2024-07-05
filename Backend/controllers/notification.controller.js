import Notification from '../models/notification.model.js'

export const getNotifications = async (req, res) => {
    try {
      const userId = req.user._id;

      const notifications = await Notification.find({ to:userId}).populate({
         path: "from",
         select: "username profileImg"
      });
          await Notification.updateMany({to:userId}, {read:true});

          res.status(200).json(notifications);
    }catch (error) {
          console.log('Error in getNotifications function', error.message);
          res.status(500).json({error: 'Internal server error'});
    }
}

export const deleteNotifications = async (req, res) => {
    try {
       const userId = req.user._id;

       await Notification.deleteMany({ to: userId });
       res.status(200).json({message: 'Notifications deleted successfully'});
    }catch(error){
        console.log('Error in deleteNotifications function', error.message);
        res.status(500).json({error: 'Internal Server Error'});
    } 
}
    
// EJEMPLO DE COMO LLAMAR Y VALIDAR UN ENDPOINT
/*export const deleteNotification = async (req, res) => {
    try {
      const notificationId = req.params.id; //Llamando la notificacion por su ID
      const userId = req.user._id //Necesitamos llamar de igual namera el id del user.
      const notification = await Notification.findById(notificationId); //Buscando la notificacion por su ID
 
      if(!notification){ // Si no se encuentra la notificacion por su ID
        return res.status(404).json({error: 'Notification Not Found'}) //Mostraremos un error diciendoq que la notificacion no se encuentra. 
      }
      if(notification.to.toString() !== userId.toString()){ //Estamos comparando que el id de la notificaion tiene que ser la misma del ID del user
        return res.status(403).json({error: 'You are not allowed to delete this'}) // si la validacion no pasa (los ID no son compatibles), mandamos un error diciendo que no esta autorizado para eliminar esa notificacion
      }
      
      await Notification.findByIdAndDelete(notificationId); // si la validacion anterior pasa o es valida podemos eliminar la notificacion.
      res.status(200).json({message: 'Notifications deleted successfully'}) //al eliminarla mandamos un mensaje diciento que la notificacion fue eliminada exitosamente. 
    }catch (error){
        console.log('Error in deleteNotification function', error.message); // mostrando los mensajes de error por si ninguna validacion pase. 
        res.status(500).json({error: 'Internal Server Error'})

    }
}*/