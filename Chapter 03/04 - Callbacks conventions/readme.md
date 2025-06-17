# Node.js callback conventions

1 - The callback comes as the last argument of the function
    * The reasoning behind this is to make the function more readable in case the callback is defined in place
2 - Errors always comes first
    * Errors must be of type Error
    * Never leave an application running after an uncaught exception is received