import boto3
from app.utils.singletonMeta import SingletonMeta
from app import Config as config

class AwsBucket(metaclass=SingletonMeta):
  def __init__(self):
    self.s3 = boto3.client(
        's3',
        aws_access_key_id=config.AWS_ACCESS_KEY,
        aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY,
        region_name=config.AWS_BUCKET_REGION
    )

  def upload_file(self, file, name):
    try:
      self.s3.upload_fileobj(file, config.AWS_BUCKET_NAME, name)
      return [True, 'File uploaded successfully', 200]
    except Exception as e:
      return [None, str(e), 500]
    
  def presign_url(self, name):
    try:
      url = self.s3.generate_presigned_url('get_object', Params={'Bucket': config.AWS_BUCKET_NAME, 'Key': name}, ExpiresIn=3600)
      return url
    except Exception as e:
      return [None, str(e), 500]