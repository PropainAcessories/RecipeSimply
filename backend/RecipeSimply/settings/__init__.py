import os

# Fly.io sets this automatically inside the VM
ON_FLY = "FLY_APP_NAME" in os.environ

if ON_FLY:
    from .prod import *
else:
    from .dev import *
