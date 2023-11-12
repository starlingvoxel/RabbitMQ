import { connect } from "amqplib";
import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});
import fastifyFormBody from "@fastify/formbody";

fastify.register(fastifyFormBody);
fastify.get("/", (req, res) => {
  res.type("text/html").send(`<body style="margin: 0px">
    <div
    class="contact1"
    style="
      
      min-height: 100%;
      padding: 15px;
      background: -webkit-linear-gradient(left, #0072ff, #00c6ff);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    "
  >
    <div
      class="container-contact1"
      style="
        width: 1163px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 90px 130px 88px 148px;
      "
    >
      <div class="contact1-pic js-tilt" data-tilt="" style="width: 296px">
        <img
          src="https://colorlib.com/etc/cf/ContactFrom_v1/images/img-01.png;"
          alt="IMG"
        />
      </div>
      <form action="/send" method="POST" style="width: 390px">
        <span
          style="
            display: block;
            font-weight: bold;
            font-family: monospace;
            font-size: 24px;
            color: #333333;
            line-height: 1.2;
            text-align: center;
            padding-bottom: 10px;
          "
          >Rabbit MQ Practica</span
        >
        <span
          style="
            display: block;
            font-family: system-ui;
            font-size: 14px;
            color: #333333;
            line-height: 1.2;
            text-align: center;
            padding-bottom: 10px;
          "
          >Starling Vasquez 1-17-0155</span
        >
        <input
          type="text"
          style="
            display: block;
            border-color: transparent !important;
            width: 100%;
            background: #e6e6e6;
            font-family: monospace;
            font-size: 30px;
            line-height: 1.5;
            color: #666666;
            height: 50px;
            border-radius: 25px;
            padding: 0 30px;
          "
          name="message"
        />
        <div style="display: flex; flex-wrap: wrap; justify-content: center">
          <button
            style="
              min-width: 193px;
              font-family: monospace;
              height: 50px;
              border-radius: 25px;
              background: #57b846;
              font-family: monospace;
              font-size: 30px;
              line-height: 1.5;
              color: #fff;
              display: -webkit-box;
              display: -webkit-flex;
              display: -moz-box;
              display: -ms-flexbox;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 25px;
              margin-top: 50px;
              border-color: transparent !important;
            "
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
  </body>
    `);
});

fastify.post("/send", async (req, res) => {
  try {
    const connection = await connect({
      hostname: "localhost",
      username: "starling",
      password: "1170155",
      port: 5672,
      vhost: "/",
      protocol: "amqp",
    });
    const channel = await connection.createChannel();
    const queue = "rabbit";

    const message = req.body.message;

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));
    console.log("Mensaje enviado:", message);

    res.type("text/html").send(`
    <div
  class="contact1"
  style="
    width: 100%;
    min-height: 100%;
    padding: 15px;
    background: -webkit-linear-gradient(left, #0072ff, #00c6ff);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  "
>
  <div
    class="container-contact1"
    style="
      width: 1163px;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 90px 130px 88px 148px;
    "
  >
    <div class="contact1-pic js-tilt" data-tilt="" style="width: 296px">
      <img
        src="https://colorlib.com/etc/cf/ContactFrom_v1/images/img-01.png;"
        alt="IMG"
      />
    </div>
   
      <span
        style="
          display: block;
          font-family: mulish;
          font-weight: bold;
          font-size: 24px;
          color: #333333;
          line-height: 1.2;
          text-align: center;
          padding-bottom: 10px;
        "
        >Mensaje enviado!</span
      >
    
  </div>
</div>
`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
    res.send("Error al enviar el mensaje");
  }
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Sender app listening on port 3000");
});


