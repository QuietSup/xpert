import os
import pika
from common import deserialize_bytes_to_dict, serialize_dict_to_bytes
from .topic_classifier import TopicClassifier
from .classify_service import ClassifyService


def run():
    # Load the model
    topic_classifier = TopicClassifier(os.environ['MODEL_PATH'])
    classify_service = ClassifyService(topic_classifier)

    print(os.environ)

    credentials = pika.PlainCredentials(
        os.environ['RMQ_USER'], os.environ['RMQ_PASS'])
    connection_params = pika.ConnectionParameters(
        host=os.environ['RMQ_HOST'],
        port=os.environ['RMQ_PORT'],
        credentials=credentials
    )

    connection = pika.BlockingConnection(connection_params)
    channel = connection.channel()

    channel.queue_declare(queue=os.environ['QUEUE_NAME'])

    def on_request(ch, method, props, body):
        request = deserialize_bytes_to_dict(body)
        print(f'[.] {request}')

        classified = classify_service.classify(request)

        response = serialize_dict_to_bytes(classified)

        ch.basic_publish(exchange='',
                         routing_key=props.reply_to,
                         properties=pika.BasicProperties(
                             correlation_id=props.correlation_id),
                         body=str(response))
        ch.basic_ack(delivery_tag=method.delivery_tag)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(
        queue=os.environ['QUEUE_NAME'], on_message_callback=on_request)

    print(" [x] Awaiting RPC requests")
    channel.start_consuming()
