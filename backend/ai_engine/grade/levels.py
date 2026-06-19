"""Nepal curriculum grade levels enum."""

from enum import Enum


class GradeLevel(str, Enum):
    """All supported grade levels in the Nepal education system."""

    # School level
    CLASS_8 = "class_8"
    CLASS_9 = "class_9"
    CLASS_10 = "class_10"

    # Higher secondary — NEB streams
    CLASS_11_SCIENCE = "class_11_science"
    CLASS_11_MANAGEMENT = "class_11_management"
    CLASS_11_HUMANITIES = "class_11_humanities"
    CLASS_12_SCIENCE = "class_12_science"
    CLASS_12_MANAGEMENT = "class_12_management"
    CLASS_12_HUMANITIES = "class_12_humanities"

    # Bachelor level
    BACHELOR_1 = "bachelor_1"
    BACHELOR_2 = "bachelor_2"
    BACHELOR_3 = "bachelor_3"
    BACHELOR_4 = "bachelor_4"
