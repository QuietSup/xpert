from typing import TypedDict
from transformers import pipeline


class ClassificationResult(TypedDict):
    label: str
    score: float


class TopicClassifier:
    """
    A class for performing text classification using a pre-trained model.
    """

    _pipe = None

    def __init__(self, model_path: str):
        """
        Initializes a TopicClassifier object.

        Args:
            model_path (str): The path to the pre-trained model.

        Raises:
            ValueError: If model_path is empty or None.
        """
        if not model_path:
            raise ValueError("model_path is required")

        self._pipe = pipeline("text-classification", model=model_path)

    @property
    def model_eval(self):
        """
        Returns the evaluation metrics of the underlying model.

        Returns:
            The evaluation metrics of the model.
        """
        return self._pipe.model.eval()

    def predict(self, text: str) -> list[ClassificationResult]:
        """
        Predicts the topic of a given text.

        Args:
            text: The input text to classify.

        Returns:
            A list of ClassificationResult objects representing the predicted topic(s).

        Raises:
            ValueError: If text is empty, None, or not a string.
            ValueError: If the model returns unexpected results.
        """
        if not text:
            raise ValueError("text is required")
        if not isinstance(text, str):
            raise ValueError("text must be a string")

        results = self._pipe(text, return_all_scores=True)

        if not results or len(results) != 1:
            raise ValueError("Unexpected results from model:", results)

        return results[0]
