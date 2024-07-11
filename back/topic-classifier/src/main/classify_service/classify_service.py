from main.topic_classifier import TopicClassifier
from common import validate_typed_dict
from .request import Request
from .response import Response


class ClassifyService:
    def __init__(self, classifier: TopicClassifier):
        self.classifier = classifier

    def classify(self, req: Request):
        res = Response()
        res['errors'] = []

        try:
            validate_typed_dict(Request, req)

            res['data'] = self.classifier.predict(req['data']['text'])
        except Exception as e:
            error = str(e)
            res['errors'].append(error)

        return res
