# import streamlit as st
# import cv2
# from ultralytics import YOLO
# from streamlit_webrtc import webrtc_streamer, VideoTransformerBase
# import numpy as np
# from PIL import Image

# # Load the YOLO model
# model = YOLO("yolo11x.pt")

# # Streamlit UI
# st.title("YOLO Object Detection")
# st.sidebar.title("Options")
# mode = st.sidebar.selectbox(
#     "Choose Mode", ["Image Upload", "Webcam Detection"])

# # Image Upload Mode
# if mode == "Image Upload":
#     st.header("Upload an Image")
#     uploaded_file = st.file_uploader(
#         "Choose an image", type=["jpg", "jpeg", "png"])

#     if uploaded_file is not None:
#         # Read and display the uploaded image
#         image = Image.open(uploaded_file)
#         st.image(image, caption="Uploaded Image", use_column_width=True)

#         # Perform detection
#         st.write("Performing Object Detection...")
#         results = model(np.array(image))

#         # Annotate the image
#         annotated_image = results[0].plot()

#         # Display the annotated image
#         st.image(annotated_image, caption="Detected Objects",
#                  use_column_width=True)

# # Webcam Detection Mode
# elif mode == "Webcam Detection":
#     st.header("Live Webcam Detection")

#     class YOLOVideoTransformer(VideoTransformerBase):
#         def transform(self, frame):
#             # Convert frame to a format YOLO expects
#             img = frame.to_ndarray(format="bgr24")

#             # Perform detection
#             results = model(img)

#             # Annotate the frame
#             annotated_frame = results[0].plot()

#             return annotated_frame

#     # Start the webcam stream
#     webrtc_streamer(
#         key="example",
#         video_transformer_factory=YOLOVideoTransformer,
#         media_stream_constraints={"video": True, "audio": False},
#     )


# import streamlit as st
# import cv2
# import numpy as np
# from ultralytics import YOLO
# from PIL import Image
# import time


# # Load the YOLO model
# model = YOLO("yolo11x.pt")

# # Streamlit UI
# st.title("Webcam Object Detection with YOLO")
# st.sidebar.title("Options")
# mode = st.sidebar.selectbox(
#     "Choose Mode", ["Image Upload", "Webcam Detection"])

# # Image Upload Mode
# if mode == "Image Upload":
#     st.header("Upload an Image")
#     uploaded_file = st.file_uploader(
#         "Choose an image", type=["jpg", "jpeg", "png"])

#     if uploaded_file is not None:
#         # Read and display the uploaded image
#         image = Image.open(uploaded_file)
#         st.image(image, caption="Uploaded Image", use_container_width=True)

#         # Perform detection
#         st.write("Performing Object Detection...")
#         results = model(np.array(image))

#         # Annotate the image
#         annotated_image = results[0].plot()

#         # Display the annotated image
#         st.image(annotated_image, caption="Detected Objects",
#                  use_container_width=True)

# # Webcam Detection Mode
# elif mode == "Webcam Detection":
#     st.header("Live Webcam Detection")

#     # Initialize OpenCV webcam capture
#     cap = cv2.VideoCapture(0)

#     # Generate unique keys using timestamps
#     start_webcam_key = f"start_webcam_{time.time()}"
#     stop_webcam_key = f"stop_webcam_{time.time()}"

#     # Start Webcam Checkbox
#     run = st.checkbox("Start Webcam", key=start_webcam_key)

#     while run:
#         ret, frame = cap.read()
#         if not ret:
#             st.warning("Failed to capture video frame.")
#             break

#         # Perform object detection
#         results = model(frame)

#         # Annotate the frame
#         annotated_frame = results[0].plot()

#         # Convert BGR (OpenCV) to RGB (Streamlit)
#         annotated_frame_rgb = cv2.cvtColor(annotated_frame, cv2.COLOR_BGR2RGB)

#         # Display the video frame
#         st.image(annotated_frame_rgb, channels="RGB", use_container_width=True)

#         # Stop Webcam Checkbox
#         if not st.checkbox("Stop Webcam", value=True, key=f"{stop_webcam_key}_{time.time()}"):
#             break

#     # Release the webcam
#     cap.release()


# import streamlit as st
# import cv2
# import numpy as np
# from ultralytics import YOLO
# from PIL import Image
# import time
# import tempfile

# # Load the YOLO model
# model = YOLO("yolo11x.pt")

# # Streamlit UI
# st.title("Webcam and Video Object Detection with YOLO")
# st.sidebar.title("Options")
# mode = st.sidebar.selectbox(
#     "Choose Mode", ["Image Upload", "Webcam Detection", "Video Upload"])

# # Image Upload Mode
# if mode == "Image Upload":
#     st.header("Upload an Image")
#     uploaded_file = st.file_uploader(
#         "Choose an image", type=["jpg", "jpeg", "png"])

#     if uploaded_file is not None:
#         # Read and display the uploaded image
#         image = Image.open(uploaded_file)
#         st.image(image, caption="Uploaded Image", use_container_width=True)

#         # Perform detection
#         st.write("Performing Object Detection...")
#         results = model(np.array(image))

#         # Annotate the image
#         annotated_image = results[0].plot()

#         # Display the annotated image
#         st.image(annotated_image, caption="Detected Objects",
#                  use_container_width=True)

# # Webcam Detection Mode
# elif mode == "Webcam Detection":
#     st.header("Live Webcam Detection")

#     # Initialize OpenCV webcam capture
#     cap = cv2.VideoCapture(0)

#     # Generate unique keys using timestamps
#     start_webcam_key = f"start_webcam_{time.time()}"
#     stop_webcam_key = f"stop_webcam_{time.time()}"

#     # Start Webcam Checkbox
#     run = st.checkbox("Start Webcam", key=start_webcam_key)

#     # Create an empty container for displaying video frames
#     frame_placeholder = st.empty()

#     while run:
#         ret, frame = cap.read()
#         if not ret:
#             st.warning("Failed to capture video frame.")
#             break

#         # Perform object detection
#         results = model(frame)

#         # Annotate the frame
#         annotated_frame = results[0].plot()

#         # Convert BGR (OpenCV) to RGB (Streamlit)
#         annotated_frame_rgb = cv2.cvtColor(annotated_frame, cv2.COLOR_BGR2RGB)

#         # Display the video frame in the placeholder
#         frame_placeholder.image(annotated_frame_rgb,
#                                 channels="RGB", use_container_width=True)

#         # Stop Webcam Checkbox
#         if not st.checkbox("Stop Webcam", value=True, key=f"{stop_webcam_key}_{time.time()}"):
#             break

#     # Release the webcam
#     cap.release()

# # Video Upload Mode
# elif mode == "Video Upload":
#     st.header("Upload a Video for Detection")
#     uploaded_video = st.file_uploader(
#         "Choose a video", type=["mp4", "avi", "mov", "mkv"])

#     if uploaded_video is not None:
#         # Save the uploaded video to a temporary file
#         with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
#             tmp_file.write(uploaded_video.read())
#             tmp_file_path = tmp_file.name

#         # Open the video using OpenCV
#         cap = cv2.VideoCapture(tmp_file_path)

#         # Create an empty container for displaying video frames
#         frame_placeholder = st.empty()

#         # Process each frame in the video
#         while cap.isOpened():
#             ret, frame = cap.read()
#             if not ret:
#                 break

#             # Perform object detection
#             results = model(frame)

#             # Annotate the frame
#             annotated_frame = results[0].plot()

#             # Convert BGR (OpenCV) to RGB (Streamlit)
#             annotated_frame_rgb = cv2.cvtColor(
#                 annotated_frame, cv2.COLOR_BGR2RGB)

#             # Display the video frame in the placeholder
#             frame_placeholder.image(
#                 annotated_frame_rgb, channels="RGB", use_container_width=True)

#         # Release the video capture
#         cap.release()


import streamlit as st
import cv2
import numpy as np
from ultralytics import YOLO
import tempfile
import time
from PIL import Image


# Load the YOLO model
model = YOLO("yolo11m.pt")  # Replace with your YOLO model path

# Streamlit UI
st.title("Webcam and Video Object Detection with YOLO")
st.sidebar.title("Options")
mode = st.sidebar.selectbox(
    "Choose Mode", ["Image Upload", "Webcam Detection", "Video Upload"])

# Image Upload Mode
if mode == "Image Upload":
    st.header("Upload an Image")
    uploaded_file = st.file_uploader(
        "Choose an image", type=["jpg", "jpeg", "png"])

    if uploaded_file is not None:
        # Read and display the uploaded image
        image = Image.open(uploaded_file)
        st.image(image, caption="Uploaded Image", use_container_width=True)

        # Perform detection
        st.write("Performing Object Detection...")
        results = model(np.array(image))

        # Annotate the image
        annotated_image = results[0].plot()

        # Display the annotated image
        st.image(annotated_image, caption="Detected Objects",
                 use_container_width=True)

# Webcam Detection Mode
elif mode == "Webcam Detection":
    st.header("Live Webcam Detection")

    # Initialize OpenCV webcam capture
    cap = cv2.VideoCapture(0)

    # Generate unique keys using timestamps
    start_webcam_key = f"start_webcam_{time.time()}"
    stop_webcam_key = f"stop_webcam_{time.time()}"

    # Start Webcam Checkbox
    run = st.checkbox("Start Webcam", key=start_webcam_key)

    # Create an empty container for displaying video frames
    frame_placeholder = st.empty()

    while run:
        ret, frame = cap.read()
        if not ret:
            st.warning("Failed to capture video frame.")
            break

        # Perform object detection
        results = model(frame)

        # Annotate the frame
        annotated_frame = results[0].plot()

        # Convert BGR (OpenCV) to RGB (Streamlit)
        annotated_frame_rgb = cv2.cvtColor(annotated_frame, cv2.COLOR_BGR2RGB)

        # Display the video frame in the placeholder
        frame_placeholder.image(annotated_frame_rgb,
                                channels="RGB", use_container_width=True)

        # Stop Webcam Checkbox
        if not st.checkbox("Stop Webcam", value=True, key=f"{stop_webcam_key}_{time.time()}"):
            break

    # Release the webcam
    cap.release()

# Video Upload Mode
elif mode == "Video Upload":
    st.header("Upload a Video for Detection")
    uploaded_video = st.file_uploader(
        "Choose a video", type=["mp4", "avi", "mov", "mkv"])

    if uploaded_video is not None:
        # Save the uploaded video to a temporary file
        with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
            tmp_file.write(uploaded_video.read())
            tmp_file_path = tmp_file.name

        # Open the video using OpenCV
        cap = cv2.VideoCapture(tmp_file_path)

        # Get video dimensions
        frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        # Define the codec and create VideoWriter object
        fourcc = cv2.VideoWriter_fourcc(*'vp80')
        out = cv2.VideoWriter('output.webm', fourcc, 30.0,
                              (frame_width, frame_height))

        # Create an empty container for displaying video frames
        frame_placeholder = st.empty()

        # Progress bar for video processing
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        progress_bar = st.progress(0)

        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_skip = int(fps / 6)  # 6 frames per second

        # Process each frame in the video
        frame_count = 0
        processed_frames = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            if frame_count % frame_skip == 0:
                # Perform object detection on the frame
                results = model(frame)

            # Annotate the frame
            annotated_frame = results[0].plot()

            # Convert BGR (OpenCV) to RGB (Streamlit)
            annotated_frame_rgb = cv2.cvtColor(
                annotated_frame, cv2.COLOR_BGR2RGB)

            # Display the video frame in the placeholder
            frame_placeholder.image(
                annotated_frame_rgb, channels="RGB", use_container_width=True)

            # Write the frame to the output video
            out.write(annotated_frame)

            # Update progress bar
            frame_count += 1
            progress_bar.progress(frame_count / total_frames)

        # Release the video capture and writer
        cap.release()

        # Inform the user that the video is saved
        st.write("The processed video has been saved as 'output.mp4'.")

        # Display the processed video
        video_file = open("output.webm", "rb")
        video_bytes = video_file.read()
        st.video(video_bytes)

# video_file = open("output.mp4", "rb")
# video_bytes = video_file.read()
# st.video(video_bytes)
